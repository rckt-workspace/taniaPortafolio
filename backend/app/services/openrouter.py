"""Servicio para comunicación con OpenRouter"""

import httpx
import json
import logging
from typing import Optional

from app.core.config import settings
from app.models.chat import ChatMessage

logger = logging.getLogger(__name__)


class OpenRouterService:
    """Cliente asíncrono para OpenRouter API"""

    def __init__(self):
        self.base_url = settings.openrouter_base_url
        self.api_key = settings.openrouter_api_key
        self.primary_model = settings.chat_primary_llm
        self.fallback_model = settings.chat_fallback_llm
        self.use_fallback = settings.chat_use_fallback
        self.timeout = settings.chat_timeout_ms / 1000  # Convertir a segundos

    def _get_headers(self) -> dict:
        """Construye headers para OpenRouter"""
        return {
            "Authorization": f"Bearer {self.api_key}",
            "HTTP-Referer": settings.openrouter_site_url,
            "X-OpenRouter-Title": settings.openrouter_site_name,
            "Content-Type": "application/json",
        }

    async def call_model(
        self,
        model: str,
        system_prompt: str,
        messages: list[ChatMessage],
    ) -> str:
        """Llama a OpenRouter con el modelo especificado"""
        payload = {
            "model": model,
            "messages": [
                {"role": "system", "content": system_prompt},
                *[{"role": msg.role.value, "content": msg.content} for msg in messages],
            ],
            "temperature": settings.chat_temperature,
            "top_p": settings.chat_top_p,
            "max_tokens": settings.chat_max_tokens,
        }

        async with httpx.AsyncClient(timeout=self.timeout) as client:
            try:
                response = await client.post(
                    f"{self.base_url}/chat/completions",
                    headers=self._get_headers(),
                    json=payload,
                )

                if not response.is_success:
                    return self._handle_error(response, model)

                data = response.json()
                if not data.get("choices"):
                    logger.error(f"No choices in OpenRouter response for {model}")
                    raise ValueError("Empty response from OpenRouter")

                return data["choices"][0]["message"]["content"]

            except httpx.TimeoutException:
                logger.warning(f"Timeout calling {model}")
                raise TimeoutError(f"Timeout after {self.timeout}s")
            except httpx.RequestError as e:
                logger.error(f"Request error calling {model}: {e}")
                raise ConnectionError(str(e))

    def _handle_error(self, response: httpx.Response, model: str) -> str:
        """Maneja errores de OpenRouter"""
        status = response.status_code

        # Errores no recuperables
        if status in (400, 401, 403):
            logger.error(f"OpenRouter {status}: {response.text}")
            raise ValueError(f"OpenRouter error: {response.text[:200]}")

        # Errores recuperables
        if self.use_fallback and self.fallback_model and self.fallback_model != model:
            if status in (429, 500, 502, 503, 504):
                logger.warning(f"Fallback triggered: {model} returned {status}")
                return "FALLBACK"

        logger.error(f"OpenRouter {status}: {response.text}")
        raise ConnectionError(f"OpenRouter error {status}")

    async def chat(
        self,
        system_prompt: str,
        messages: list[ChatMessage],
    ) -> str:
        """
        Chat con fallback automático.
        Intenta modelo primario; si falla recuperablemente y está habilitado,
        intenta modelo fallback.
        """
        try:
            return await self.call_model(self.primary_model, system_prompt, messages)
        except (TimeoutError, ConnectionError) as e:
            if not self.use_fallback or not self.fallback_model:
                raise

            logger.info(f"Attempting fallback model: {self.fallback_model}")
            try:
                return await self.call_model(
                    self.fallback_model, system_prompt, messages
                )
            except Exception as fallback_error:
                logger.error(f"Fallback model also failed: {fallback_error}")
                raise ConnectionError(
                    "No se pudo procesar tu solicitud. Intenta más tarde."
                )


openrouter = OpenRouterService()

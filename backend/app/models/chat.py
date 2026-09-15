from pydantic import BaseModel, Field
from typing import Literal
from enum import Enum


class MessageRole(str, Enum):
    """Roles permitidos en mensajes"""
    USER = "user"
    ASSISTANT = "assistant"


class ChatMessage(BaseModel):
    """Mensaje individual en la conversación"""
    role: MessageRole
    content: str = Field(..., min_length=1, max_length=2000)


class ChatRequest(BaseModel):
    """Request para el endpoint /api/chat"""
    messages: list[ChatMessage] = Field(..., max_length=12)

    def validate_messages(self):
        """Validaciones adicionales"""
        if not self.messages:
            raise ValueError("El historial no puede estar vacío")

        if self.messages[-1].role != MessageRole.USER:
            raise ValueError("El último mensaje debe ser del usuario")

        for msg in self.messages:
            if not msg.content.strip():
                raise ValueError("Los mensajes no pueden estar vacíos")


class ChatResponse(BaseModel):
    """Response del endpoint /api/chat"""
    role: Literal["assistant"] = "assistant"
    content: str

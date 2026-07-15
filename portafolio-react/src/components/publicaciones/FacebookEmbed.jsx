import styles from './FacebookEmbed.module.css';

export default function FacebookEmbed({ url, tipo }) {
  const encoded = encodeURIComponent(url);
  const src =
    tipo === 'post'
      ? `https://www.facebook.com/plugins/post.php?href=${encoded}&show_text=false&width=500`
      : `https://www.facebook.com/plugins/video.php?href=${encoded}&show_text=false&width=350`;

  return (
    <div className={styles.wrap}>
      <iframe
        key={src}
        src={src}
        className={styles.iframe}
        style={{ border: 'none', overflow: 'hidden' }}
        scrolling="no"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        title="Publicación de Facebook"
      />
    </div>
  );
}

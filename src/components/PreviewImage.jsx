function PreviewImage(url) {
  const sourceUrl = URL.createObjectURL(url);
  return <img src={sourceUrl} className="max-w-sm" />;
}

export default PreviewImage;

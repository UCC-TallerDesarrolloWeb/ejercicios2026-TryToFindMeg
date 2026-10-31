const currentYear = new Date().getFullYear();

function Footer() {
  return (
    <footer className="site-footer">
      © {currentYear} · Gimnasio · Taller de Desarrollo Web
    </footer>
  );
}

export default Footer;

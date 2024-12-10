module.exports = (req, res, next) => {
  // Defina uma política CSP que permita carregamento de scripts do próprio domínio e de fontes confiáveis
  res.setHeader("Content-Security-Policy", 
    "default-src 'self'; " +  // Permite apenas conteúdo do próprio domínio
    "script-src 'self' https://vercel.live; " +  // Permite scripts de vercel.live (ajuste conforme necessário)
    "style-src 'self' 'unsafe-inline'; " +  // Permite estilos do próprio domínio e inline (para estilos embutidos)
    "img-src 'self'; " +  // Permite imagens do próprio domínio
    "font-src 'self'; " +  // Permite fontes do próprio domínio
    "connect-src 'self'; " + // Permite conexões ao próprio domínio (para APIs)
    "object-src 'none'; " +  // Bloqueia objetos (apenas o necessário é permitido)
    "frame-src 'none';" // Bloqueia iframes
  );
  next();
};

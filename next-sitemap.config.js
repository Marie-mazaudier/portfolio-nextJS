/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl:
    process.env.NEXT_PUBLIC_PRODUCTION_URL || "https://www.votresite.com", // Remplacez par votre URL
  generateRobotsTxt: true, // Créez aussi un fichier robots.txt
  changefreq: "weekly", // Fréquence à laquelle les pages sont mises à jour
  priority: 0.7, // Priorité des pages
  exclude: ["/mention-legales"], // Exclure la page des mentions légales
};

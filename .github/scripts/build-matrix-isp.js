module.exports = ({ context, core }) => {
    // Convertir les variables d'environnement en structures utilisables
    const paths = process.env.PATHS.split(',');
    const ispList = JSON.parse(process.env.ISP);

    // Afficher les chemins et ISP pour le débogage
    console.log('Paths:', paths);
    console.log('ISP List:', ispList);

    // Créer un tableau de résultats en faisant correspondre les chemins aux ISP
    const pathMapping = paths.map(path => {
      // Chercher une correspondance dans ISP en utilisant working-directory
      const matchingIsp = ispList.find(isp => isp['working-directory'] === path);

      // Afficher la correspondance trouvée pour le chemin
      console.log(`Matching ISP for path ${path}:`, matchingIsp);

      // Retourner l'objet correspondant ou null si aucune correspondance n'est trouvée
      if (matchingIsp) {
        console.log(`Path ${path} matched ISP ${matchingIsp.name}`);
        return {
          name: matchingIsp.name,
          workspace: matchingIsp.workspace,
          'working-directory': path,
          role: matchingIsp.role,
          runner: matchingIsp.runner
        };
      } else {
        return null;
      }
    }).filter(item => item !== null); // Filtrer les valeurs nulles

    // Afficher le résultat final pour le débogage
    console.log('Path Mapping:', pathMapping);

    // Retourner le tableau des objets correspondants
    return pathMapping;
  };

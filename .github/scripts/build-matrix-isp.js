module.exports = ({ context, core }) => {
  // Convertir les variables d'environnement en structures utilisables
  const paths = JSON.parse(process.env.PATHS).terraform || [];
  const ispList = JSON.parse(process.env.ISP);

  // Afficher les chemins et ISP pour le débogage
  console.log('Paths:', paths);
  console.log('ISP List:', ispList);

  // Créer un tableau de résultats en faisant correspondre les chemins aux ISP
  const pathMapping = paths.map(path => {
    // Chercher une correspondance basée sur les chemins
    const matchingIsp = ispList.find(isp => {
      // Vérifier si le chemin contient le workspace de l'ISP
      return path.includes(isp.workspace) || isp.workspace === 'default';
    });

    console.log(`Matching ISP for path ${path}:`, matchingIsp);

    // Retourner l'objet correspondant ou null si aucune correspondance n'est trouvée
    if (matchingIsp) {
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

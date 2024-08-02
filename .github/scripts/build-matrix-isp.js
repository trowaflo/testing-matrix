
module.exports = ({ context, core }) => {
  console.log('Building matrix');
  console.log('Environment variables:', process.env);
  const paths = process.env.PATHS.split(',');
  const ispData = JSON.parse(process.env.ISP);

  console.log('Paths:', paths);
  console.log('ISP data:', ispData);

  const pathNameMapping = paths.map(path => {
    console.log(`Mapping path: ${path}`);
    const matchingIsp = ispData.find(isp => isp['working-directory'] === path);
    console.log(`Matching ISP:`, matchingIsp);

    return {
      path,
      name: matchingIsp ? matchingIsp.name : 'blabla'
    };
  });

  console.log('Path name mapping:', pathNameMapping);

  return pathNameMapping;
};

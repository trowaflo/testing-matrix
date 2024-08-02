
module.exports = ({ context, core }) => {
  const paths = process.env.PATHS.split(',');
  const ispList = JSON.parse(process.env.ISP);
  const pathMapping = {};

  console.log('Paths:', paths);
  console.log('ISP List:', ispList);

  paths.forEach(path => {
    const normalizedPath = path.replace(/-/g, '');
    const matchingIsp = ispList.find(isp => normalizedPath.includes(isp.workspace.replace(/-/g, '')));

    console.log(`Matching ISP for path ${path}:`, matchingIsp);

    if (matchingIsp) {
      console.log(`Path ${path} matched ISP ${matchingIsp.name}`);
      pathMapping[path] = {
        name: matchingIsp.name,
        workspace: matchingIsp.workspace,
        'working-directory': path,
        role: matchingIsp.role,
        runner: matchingIsp.runner
      };
    }
  });

  console.log('Path Mapping:', pathMapping);

  return Object.values(pathMapping);
};


console.log('Starting build matrix function');

module.exports = ({ context, core }) => {
    console.log('Building matrix');
    console.log('Environment variables:', process.env);
    const matrix = process.env.PATHS.terraform.map(path => {
        console.log(`Mapping path: ${path}`);
        const isp = path.startsWith(".cloud/terraform/blabla") ? process.env.ISP.find(i => i.name === 'blabla') : process.env.ISP.find(i => i.name === 'blibli');
        console.log(`ISP: ${isp}`);
        return {
            path: path,
            workspace: isp.workspace,
            'working-directory': isp['working-directory'],
            role: isp.role,
            runner: isp.runner
        };
    });

    console.log('Matrix:', matrix);
    return matrix;
};

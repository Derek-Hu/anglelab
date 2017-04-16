import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackDevConfig from './webpack.dev.config';
import clearConsole from './webpack/clearConsole';
import formatWebpackMessages from './webpack/formatWebpackMessages';
import chalk from 'chalk';

var isInteractive = process.stdout.isTTY;

function serve(port) {
    var compiler = webpack(webpackDevConfig);

    compiler.plugin('invalid', function () {
        if (isInteractive) {
            clearConsole();
        }
        console.log('Compiling...');
    });

    // "done" event fires when Webpack has finished recompiling the bundle.
    // Whether or not you have warnings or errors, you will get this event.
    compiler.plugin('done', function (stats) {
        if (isInteractive) {
            clearConsole();
        }
        // We have switched off the default Webpack output in WebpackDevServer
        // options so we are going to "massage" the warnings and errors and present
        // them in a readable focused way.
        var messages = formatWebpackMessages(stats.toJson({}, true));

        var isSuccessful = !messages.errors.length && !messages.warnings.length;
        var showInstructions = true;

        if (isSuccessful) {
            console.log(chalk.green('Compiled successfully!'));
        }

        // If errors exist, only show errors.
        if (messages.errors.length) {
            console.log(chalk.red('Failed to compile.'));
            console.log();
            messages.errors.forEach(message => {
                console.log(message);
                console.log();
            });
            return;
        }

    // Show warnings if no errors were found.
        if (messages.warnings.length) {
            console.log(chalk.yellow('Compiled with warnings.'));
            console.log();
            messages.warnings.forEach(message => {
                console.log(message);
                console.log();
            });
      // Teach some ESLint tricks.
            console.log('You may use special comments to disable some warnings.');
            console.log('Use ' + chalk.yellow('// eslint-disable-next-line') + ' to ignore the next line.');
            console.log('Use ' + chalk.yellow('/* eslint-disable */') + ' to ignore all warnings in a file.');
        }

        if (showInstructions) {
            console.log();
            console.log('The app is running at:');
            console.log();
            console.log('  ' + chalk.cyan('http://localhost:' + port + '/'));
            console.log();
            console.log('Note that the development build is not optimized.');
            console.log('To create a production build, use ' + chalk.cyan('npm run build') + '.');
            console.log();
            console.log('To start the mock server, use ' + chalk.cyan('npm run mock') + '.');
            console.log();
        }
    });

    var devServer = new WebpackDevServer(compiler, {
        // Enable gzip compression of generated files.
        compress: true,
        // Silence WebpackDevServer's own logs since they're generally not useful.
        // It will still show compile warnings and errors with this setting.
        clientLogLevel: 'none',
        contentBase: 'www',
        // Enable hot reloading server. It will provide /sockjs-node/ endpoint
        // for the WebpackDevServer client so it can learn when the files were
        // updated. The WebpackDevServer client is included as an entry point
        // in the Webpack development configuration. Note that only changes
        // to CSS are currently hot reloaded. JS changes will refresh the browser.
        hot: true,
        // It is important to tell WebpackDevServer to use the same "root" path
        // as we specified in the config. In development, we always serve from /.
        publicPath: webpackDevConfig.output.publicPath,
        // WebpackDevServer is noisy by default so we emit custom message instead
        // by listening to the compiler events with `compiler.plugin` calls above.
        quiet: true,
        watchOptions: {
            ignored: /node_modules/
        },
        // Enable HTTPS if the HTTPS environment variable is set to 'true'
        https: false
    });

    devServer.use(devServer.middleware);
      // Launch WebpackDevServer.
    devServer.listen(port, err => {
        if (err) {
            return console.log(err);
        }

        console.log('Starting the development server...');
        console.log();

    });
}
var DEFAULT_PORT = 4001;

serve(DEFAULT_PORT);

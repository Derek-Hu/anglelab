1. 安装依赖
`npm install`

2. 启动服务
`npm start`

3. 打包
a. 运行`ionic platform add android`增加Android平台支持
b. 需要安装Android SDK 和 Java SDK 并配置环境变量ANDROID_HOME 和 JAVA_HOME
c. 将ANDROID_HOME/platform-tools 和 ANDROID_HOME/tools目录加入到可执行文件环境变量中
d. 运行`npm run build`

4. 分支
使用dev分支进行开发（无文件读写代码）,开发完成后将代码cherry-pick至master分支
使用master分支打包（涉及到文件读写，浏览器开发阶段无法使用该分支）

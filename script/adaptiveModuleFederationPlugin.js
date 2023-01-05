import federation from "@originjs/vite-plugin-federation";

export default function adaptiveModuleFederationPlugin(federationConfig) {
  const adpativePlugin = () => ({
    name: "adaptiveModuleFederation",
    config(config, { command }) {
      if (command === "serve") {
        if (!config.server.proxy) {
          config.server.proxy = {};
        }

        const remotes = federationConfig.remotes;
        const remoteKeys = Object.keys(remotes);

        remoteKeys.forEach((key) => {
          const urlConfig = remotes[key];
          let url = "";
          if (typeof urlConfig === "string") {
            url = urlConfig;
          } else if (typeof urlConfig === "object") {
            url = urlConfig.external;
          }
          const preffixUrl = url.substring(0, url.lastIndexOf("/"));
          const endUrl = url.substring(url.lastIndexOf("/"));
          const proxyPath = "/proxy" + key;
          const reg = new RegExp(`^${proxyPath}`);

          config.server.proxy[proxyPath] = {
            target: preffixUrl,
            changeOrigin: true,
            rewrite: (path) => path.replace(reg, ""),
          };

          const updateUrl = proxyPath + endUrl;

          if (typeof urlConfig === "string") {
            federationConfig.remotes[key] = updateUrl;
          } else if (typeof urlConfig === "object") {
            federationConfig.remotes[key].external = updateUrl;
          }
        });
      }
    },
  });

  return [adpativePlugin(), federation(federationConfig)];
}

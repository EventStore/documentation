<template>
  <div>
    <h3>Node {{ node.index }}</h3>
    <pre><code>{{ configFile }}</code></pre>
  </div>
</template>

<script>
export default {
  name: "NodeConfig",
  props: {
    node: Object
  },
  computed: {
    configFile() {
      const config = ["---"];
      config.add = function(n, v) {
        if (v) this.push(`${n}: ${v}`);
      };
      config.addIf = function(n, v, c) {
        if (c && v) this.push(`${n}: ${v}`);
      };

      config.push("# Paths");
      config.push(`Db: ${this.node.path.db}`);
      config.push(`Index: ${this.node.path.index}`);
      config.push(`Log: ${this.node.path.log}`);

      if (this.node.certificate) {
        config.push("\n# Certificates configuration");
        config.add("CertificateFile", this.node.certificate.file);
        config.add("CertificatePrivateKeyFile", this.node.certificate.key);
        config.add("TrustedRootCertificatesPath", this.node.certificate.trusted);
        config.add("CertificateReservedNodeCommonName", this.node.certificate.cn);
      }

      config.push("\n# Network configuration");
      config.add("IntIp", this.node.network.intIp);
      config.add("ExtIp", this.node.network.extIp);
      config.add("IntHostAdvertiseAs", this.node.network.intHost);
      config.add("ExtHostAdvertiseAs", this.node.network.extHost);
      config.add("HttpPort", this.node.network.httpPort);
      config.add("IntTcpPort", this.node.network.intTcpPort);
      config.addIf("ExtTcpPort", this.node.network.extTcpPort, this.node.network.enableTcp);
      config.add("EnableExternalTcp", this.node.network.enableTcp);
      config.add("EnableAtomPubOverHTTP", this.node.network.enableAtom);

      return config.join("\n");
    }
  }
}
</script>

<style scoped>

</style>

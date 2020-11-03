<template>
  <div>
    <h4>Node {{ nodeConfig.index }}</h4>
    <CertCn :common-name="nodeConfig.cn"/>

    <CertSan
            v-for="(dns, index) in nodeConfig.dns"
            :key="`dns-${index}`"
            ext-type="DNS Name"
            :ext-value="dns"
    />

    <CertSan
            v-for="(ip, index) in nodeConfig.ips"
            :key="`ip-${index}`"
            ext-type="IP Address"
            :ext-value="ip"
    />

    Command for the node certificate generation:
    <p></p>
    <prism language="bash">{{ nodeConfig.script }}</prism>

  </div>
</template>

<script>
import CertCn from "../security/CertCn";
import CertSan from "../security/CertSan";

export default {
    name:       "NodeCertificate",
    props:      {
        nodeConfig: Object
    },
    components: {CertCn, CertSan},
}
</script>

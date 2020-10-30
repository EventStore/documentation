<template>
  <div>
    <el-switch
        v-model="ent"
        inactive-text="Open-Source"
        active-text="Enterprise">
    </el-switch>
    <p></p>

    <h3>Install EventStoreDB on each node</h3>
    <div v-if="isLinux">
      <p>
        Use packagecloud private repository:
      </p>
      <transition name="slide">
        <div v-show="ent">
          <span class="el-form-item__label">Package key:</span>
          <el-input placeholder="Enter package key" v-model="key" style="width: 300px"></el-input>
          <p></p>
          <el-radio-group v-model="os">
            <el-radio-button label="ubuntu">Ubuntu</el-radio-button>
            <el-radio-button label="amazon">Amazon Linux 2</el-radio-button>
            <el-radio-button label="centos">CentOS 7</el-radio-button>
            <el-radio-button label="oracle">Oracle Linux 7</el-radio-button>
          </el-radio-group>
          <p></p>
        </div>
      </transition>
      <prism language="bash">curl -s https://{{ safeKey }}packagecloud.io/install/repositories/EventStore/EventStore-{{ ent ? "Commercial" : "OSS" }}/script.deb.sh | sudo bash
sudo {{ pkgmgr }} install eventstore-{{ ent ? "commercial" : "oss" }}{{ version }}</prism>
      <Download :alternate="true" :ent="ent"/>
      <p></p>
      After installing the package, the <code>eventstore</code> service doesn't start automatically. That's because
      you need to provide the configuration first, which includes all the necessary options for the EventStoreDB node
      to work.
    </div>
    <div v-else>
      <transition name="slide">
        <div v-show="!ent">
          Use <a href="https://chocolatey.org/" target="_blank">Chocolatey</a>:
          <pre><code>choco install eventstore-oss</code></pre>
        </div>
      </transition>
      <Download :ent="ent" :alternate="!ent"/>
    </div>

    <h3>Complete post-installation steps</h3>
    <ul>
      <li v-show="topology.secure && selfSigned">
        Copy <code>node.crt</code> and <code>node.key</code> files to <code>{{ certsDir }}</code> on each node.
      </li>
      <li v-show="topology.secure && !selfSigned">
        Copy the wildcard certificate and key files to <code>{{ certsDir }}</code> on each node.
      </li>
      <li v-show="topology.secure && selfSigned">
        Copy <code>ca.crt</code> file to <code>{{ caDir }}</code> on each node.
      </li>
      <li>
        Create a file called <code>eventstore.conf</code> using the node configuration from the section below, for each
        node.
      </li>
      <li>
        Place the file to the <code>{{ directories.config }}</code> directory of the node.
      </li>
      <li v-show="isLinux">
        We recommend that when using Linux you set the 'open file limit' to a high number.
        The precise value depends on your use case, but at least between 30,000 and 60,000.
      </li>
      <li v-show="isLinux">
        Start the service using <code>sudo systemctl start eventstore</code> command.
      </li>
      <li v-show="!isLinux">
        Start the server by <code>EventStore.ClusterNode.exe --config {{ directories.config }}\eventstore.conf</code>
      </li>
    </ul>
  </div>
</template>

<script>
import Download from "./Download";
import {sep} from "../theme/util/strings";

export default {
  name: "Installation",
  components: {Download},
  props: {
    topology: Object,
    directories: Object
  },
  data() {
    return {
      ent: false,
      key: "",
      os: "ubuntu"
    }
  },
  computed: {
    isLinux() {
      return this.topology.platform === "linux";
    },
    selfSigned() {
      return this.topology.cert === 'self-signed';
    },
    safeKey() {
      return this.ent ? this.key !== "" ? this.key : "<your key>@" : "";
    },
    pkgmgr() {
      return this.os === "ubuntu" ? "apt" : "yum";
    },
    version() {
      switch (this.os) {
        case "ubuntu":
          return "=20.6.1-2"
        case "centos":
          return "-20.6.1-1.el7"
        case "amazon":
          return "-20.6.1-1.amzn2"
        case "oracle":
          return "-20.6.1-1.ol7"
      }
    },
    sep() {
      return sep(this.topology.platform);
    },
    certsDir() {
      return `${this.directories.config}${this.sep}certs`;
    },
    caDir() {
      return `${this.certsDir}${this.sep}ca`;
    }
  }
}
</script>

<style scoped>
</style>

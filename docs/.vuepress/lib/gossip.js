import * as axios from "axios";

async function get(url, timeout) {
    //http://bu6lsm2rh41uf5akmiog-2.mesdb.eventstore.cloud:2113/

    try {
        const response = await axios.default.get(url,
            {
                timeout: timeout, withCredentials: false, headers: {"Accept": "application/json"}
            }
        );
        return response.data;
    } catch (e) {
        return undefined;
    }
}

async function getBoth(address, port, path, timeout) {
    const base = `${address}:${port}/${path}`;
    const response = await get(`https://${base}`, timeout);
    return response ? response : await get(`http://${base}`, timeout);
}

export async function getClusterConfig(address, port) {
    const info   = await getBoth(address, port, "info", 500);
    const gossip = await getBoth(address, port, "gossip", 500);

    return {info, gossip};
}

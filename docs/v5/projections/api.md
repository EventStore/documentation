# HTTP API

<table>
    <thead>
        <tr>
            <th>URI</th>
            <th>Description</th>
            <th>HTTP Verb</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>/projections/any</code></td>
            <td>
                Returns all known projections.
            </td>
            <td>
                GET
            </td>
        </tr>
        <tr>
           <td><code>/projections/all-non-transient</code></td>
           <td>
               Returns all known non ad-hoc projections.
           </td>
           <td>
               GET
           </td>
        </tr>
        <tr>
           <td><code>/projections/transient</code></td>
           <td>
               Returns all known ad-hoc projections.
           </td>
           <td>
               GET
           </td>
        </tr>
        <tr>
           <td><code>/projections/onetime</code></td>
           <td>
                Returns all known one-time projections.
           </td>
           <td>
               GET
           </td>
        </tr>
        <tr>
           <td><code>/projections/continuous</code></td>
           <td>
                Returns all known continuous projections.
           </td>
           <td>
               GET
           </td>
        </tr>
        <tr>
           <td><code>/projections/transient?name={name}&type={type}&enabled={enabled}</code></td>
           <td>
                Create an ad-hoc projection.<br/>
                This type of projection runs until completion and automatically deleted afterwards.
           </td>
           <td>
               POST
           </td>
        </tr>
        <tr>
            <td colspan="3">
                <h3>Parameters</h3>
                <ul>
                  <li>
                      name: Name of the projection
                  </li>
                  <li>
                      type: JS or Native. (JavaScript or native. At this time, Event Store only supports JavaScript)
                  </li>
                  <li>
                      enabled: Enable the projection (true/false)
                  </li>
                </ul>
            </td>
        </tr>
        <tr>
           <td><code>/projections/onetime?name={name}&type={type}&enabled={enabled}&checkpoints={checkpoints}&emit={emit}&trackemittedstreams={trackemittedstreams}</code></td>
           <td>
                Create a one-time projection.<br/>
                This type of projection runs until completion and then stops.
           </td>
           <td>
               POST
           </td>
        </tr>
        <tr>
            <td colspan="3">
                <h3>Parameters</h3>
                <ul>
                  <li>
                      name: Name of the projection
                  </li>
                  <li>
                  type: JS or Native. (JavaScript or native. At this time, Event Store only supports JavaScript)
                  </li>
                  <li>
                      enabled: Enable the projection (true/false)
                  </li>
                  <li>
                      checkpoints: Enable checkpoints (true/false)
                  </li>
                  <li>
                      emit: Enable the ability for the projection to write to streams (true/false)
                  </li>
                  <li>
                      trackemittedstreams: Write the name of the streams the projection is managing to a separate stream. $projections-{projection-name}-emittedstreams (true/false)
                  </li>
                </ul>
            </td>
        </tr>
        <tr>
           <td><code>/projections/continuous?name={name}&type={type}&enabled={enabled}&emit={emit}&trackemittedstreams={trackemittedstreams}</code></td>
           <td>
                Create a continuous projection.<br/>
                This type of projection will, if enabled will continuously run unless disabled or an unrecoverable error is encountered.
           </td>
           <td>
               POST
           </td>
        </tr>
        <tr>
            <td colspan="3">
                <h3>Parameters</h3>
                <ul>
                  <li>
                      name: Name of the projection
                  </li>
                  <li>
                  type: JS or Native. (JavaScript or native. At this time, Event Store only supports JavaScript)
                  </li>
                  <li>
                      enabled: Enable the projection (true/false)
                  </li>
                  <li>
                      emit: Allow the projection to write to streams (true/false)
                  </li>
                  <li>
                      trackemittedstreams: Write the name of the streams the projection is managing to a separate stream. $projections-{projection-name}-emittedstreams (true/false)
                  </li>
                </ul>
            </td>
        </tr>
        <tr>
           <td><code>/projection/{name}/query?config={config}</code></td>
           <td>
                Returns the definition query and if config is set to true, will return the configuration.
           </td>
           <td>
               GET
           </td>
        </tr>
        <tr>
            <td colspan="3">
                <h3>Parameters</h3>
                <ul>
                  <li>
                      name: Name of the projection
                  </li>
                  <li>
                      config: Return the definition of the projection (true/false)
                  </li>
                </ul>
            </td>
        </tr>
        <tr>
           <td><code>/projection/{name}/query?type={type}&emit={emit}</code></td>
           <td>
                Update a projection's query.
           </td>
           <td>
               PUT
           </td>
        </tr>
        <tr>
            <td colspan="3">
                <h3>Parameters</h3>
                <ul>
                  <li>
                      name: Name of the projection
                  </li>
                  <li>
                  type: JS or Native. (JavaScript or native. At this time, Event Store only supports JavaScript)
                  </li>
                  <li>
                      emit: Allow the projection to write to streams (true/false)
                  </li>
                  <li>
                      trackemittedstreams: Write the name of the streams the projection is managing to a separate stream. $projections-{projection-name}-emittedstreams (true/false)
                  </li>
                </ul>
            </td>
        </tr>
        <tr>
           <td><code>/projection/{name}</code></td>
           <td>
                Returns information for a projection.
           </td>
           <td>
               GET
           </td>
        </tr>
        <tr>
           <td><code>/projection/{name}?deleteStateStream={deleteStateStream}&deleteCheckpointStream={deleteCheckpointStream}&deleteEmittedStreams={deleteEmittedStreams}</code></td>
           <td>
                Delete a projection, optionally delete the streams that were created as part of the projection.
           </td>
           <td>
               DELETE
           </td>
        </tr>
        <tr>
            <td colspan="3">
                <h3>Parameters</h3>
                <ul>
                  <li>
                      name: Name of the projection
                  </li>
                  <li>
                      deleteStateStream: Delete the state stream (true/false)
                  </li>
                  <li>
                      deleteCheckpointStream: Delete the checkpoint stream (true/false)
                  </li>
                  <li>
                      deleteEmittedStreams: Delete the emitted streams stream (true/false)
                  </li>
                </ul>
            </td>
        </tr>
        <tr>
           <td><code>/projection/{name}/statistics</code></td>
           <td>
                Returns detailed information for a projection.
           </td>
           <td>
               GET
           </td>
        </tr>
        <tr>
            <td colspan="3">
               <h3>Parameters</h3>
               <ul>
                 <li>
                     name: Name of the projection
                 </li>
               </ul>
           </td>
        </tr>
        <tr>
           <td><code>/projection/{name}/state?partition={partition}</code></td>
           <td>
                Query for the state of a projection.
           </td>
           <td>
               GET
           </td>
        </tr>
        <tr>
            <td colspan="3">
              <h3>Parameters</h3>
               <ul>
                 <li>
                     name: Name of the projection
                 </li>
                 <li>
                     partition: The partition
                 </li>
               </ul>
           </td>
        </tr>
        <tr>
           <td><code>/projection/{name}/result?partition={partition}</code></td>
           <td>
                Query for the result of a projection.
           </td>
           <td>
               GET
           </td>
        </tr>
        <tr>
            <td colspan="3">
              <h3>Parameters</h3>
               <ul>
                 <li>
                     name: Name of the projection
                 </li>
                 <li>
                     partition: The partition
                 </li>
               </ul>
           </td>
        </tr>
        <tr>
           <td><code>/projection/{name}/command/disable?enableRunAs={enableRunAs}</code></td>
           <td>
                Disable a projection.
           </td>
           <td>
               POST
           </td>
        </tr>
        <tr>
            <td colspan="3">
               <h3>Parameters</h3>
               <ul>
                 <li>
                     name: Name of the projection
                 </li>
                 <li>
                     enableRunAs: Enables the projection to run as the user who issued the request.
                 </li>
               </ul>
           </td>
        </tr>
        <tr>
           <td><code>/projection/{name}/command/enable?enableRunAs={enableRunAs}</code></td>
           <td>
                Enable a projection.
           </td>
           <td>
               POST
           </td>
        </tr>
        <tr>
            <td colspan="3">
               <h3>Parameters</h3>
               <ul>
                 <li>
                     name: Name of the projection
                 </li>
                 <li>
                     enableRunAs: Enables the projection to run as the user who issued the request.
                 </li>
               </ul>
           </td>
        </tr>
        <tr>
           <td><code>/projection/{name}/command/reset?enableRunAs={enableRunAs}</code></td>
           <td>
                Reset a projection. (This will re-emit events, streams that are written to from the projection will also be soft deleted).
           </td>
           <td>
               POST
           </td>
        </tr>
        <tr>
            <td colspan="3">
               <h3>Parameters</h3>
               <ul>
                 <li>
                     name: Name of the projection
                 </li>
                 <li>
                     enableRunAs: Enables the projection to run as the user who issued the request.
                 </li>
               </ul>
           </td>
        </tr>
        <tr>
           <td><code>/projection/{name}/command/abort?enableRunAs={enableRunAs}</code></td>
           <td>
                Abort a projection.
           </td>
           <td>
               POST
           </td>
        </tr>
        <tr>
            <td colspan="3">
               <h3>Parameters</h3>
               <ul>
                 <li>
                     name: Name of the projection
                 </li>
                 <li>
                     enableRunAs: Enables the projection to run as the user who issued the request.
                 </li>
               </ul>
           </td>
        </tr>
    </tbody>
</table>

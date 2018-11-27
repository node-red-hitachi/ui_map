node-red-contrib-ui_map
=======================

Node-RED widget node for showing map.



Install
-------

Run the following command in your Node-RED user directory - typically `~/.node-red`

        npm install node-red-contrib-ui_map

Example
-------
```
[{"id":"fc1df50e.61e448","type":"tab","label":"フロー 1","disabled":false,"info":""},{"id":"9745b58d.f907e8","type":"ui_map","z":"fc1df50e.61e448","group":"fc29cb4e.0d11e8","name":"","order":2,"width":"12","height":"8","x":450,"y":100,"wires":[[]]},{"id":"9f20ffe5.f253b","type":"ui_list","z":"fc1df50e.61e448","group":"fc29cb4e.0d11e8","name":"","order":1,"width":"7","height":"8","lineType":"one","actionType":"click","allowHTML":false,"x":290,"y":100,"wires":[["9745b58d.f907e8"]]},{"id":"5fd3592b.1004f8","type":"inject","z":"fc1df50e.61e448","name":"","topic":"","payload":"[{\"title\":\"London\",\"payload\":{\"center\":[-0.127758,51.507351],\"zoom\":10}},{\"title\":\"Hursley\",\"payload\":{\"center\":[-1.39,51.02],\"zoom\":13}},{\"title\":\"Tokyo\",\"payload\":{\"center\":[139.767052,35.681167],\"zoom\":10}},{\"title\":\"Omori\",\"payload\":{\"center\":[139.731301,35.587876],\"zoom\":13}},{\"title\":\"Shin-Kawasaki\",\"payload\":{\"center\":[139.674059,35.549937],\"zoom\":13}},{\"title\":\"Shinagawa\",\"payload\":{\"center\":[139.730186,35.609226],\"zoom\":13}},{\"title\":\"Totsuka\",\"payload\":{\"center\":[139.539852,35.402651],\"zoom\":13}},{\"title\":\"Kokubunji\",\"payload\":{\"center\":[139.47,35.7],\"zoom\":13}}]","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":130,"y":100,"wires":[["9f20ffe5.f253b"]]},{"id":"fc29cb4e.0d11e8","type":"ui_group","z":"","name":"デフォルト","tab":"b71d995d.bf0c38","disp":false,"width":"19","collapse":false},{"id":"b71d995d.bf0c38","type":"ui_tab","z":"","name":"ホーム","icon":"dashboard"}]
```

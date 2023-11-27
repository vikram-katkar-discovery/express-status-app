# express-status-app

#### An Express JS app with an endpoint (`/status`) that changes it's output after `STATUS_INTERVAL_SECONDS` (5min default).

```
$ curl http://localhost:3000/status
{"status":"OK"}
```

after `STATUS_INTERVAL_SECONDS` or 5 minutes

```
$ curl http://localhost:3000/status
{"status":"ERROR"}
```

#### To test in the K8s environment, run following pod

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mypod
spec:
  containers:
  - name: netshoot
    image: nicolaka/netshoot
    command: ['sh', '-c', 'while true; do sleep 3600; done']  # Keep the container running
  - name: express-status-app-container
    image: ghcr.io/vikram-katkar-discovery/express-status-app:main
    ports:
    - containerPort: 3000
```

Login to the container and curl the endpoint

```
kubectl exec -it mypod -c netshoot -- sh
```

```
curl http://localhost:3000/status
```

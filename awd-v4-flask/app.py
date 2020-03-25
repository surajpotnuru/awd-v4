import flask
import json
import flask_cors
import os
import subprocess
import requests
import shutil

host_ip = "0.0.0.0"
app_data_path = "app-data/"

app = flask.Flask(__name__)
flask_cors.CORS(app)

@app.route("/")
def baseRoute():
    return flask.Response(
        status=403
    )


@app.route("/getprojects", methods=["GET"])
def getprojects():
    try:
        with open(app_data_path + "projects.json", "r") as fp:
            projects = json.loads(fp.read())
        data = {
            "status": "success",
            "message": projects
        }
        return flask.Response(
            response = json.dumps(data),
            status = 200,
            mimetype = 'application/json'
        )
    except Exception as exp:
        data = {
            "status": "error",
            "message": str(exp)
        }
        return flask.Response(
            response = json.dumps(data),
            status = 500,
            mimetype = 'application/json'
        )

@app.route("/createproject", methods=["POST"])
def createproject():
    if flask.request.content_type == "application/json":
        try:
            payload = json.loads(flask.request.data.decode("ascii"))
            with open(app_data_path + "projects.json", "r") as fp:
                projects = json.loads(fp.read())
            project_name = payload["name"]
            if project_name in list(projects["projects"].keys()):
                data = {
                    "status": "error",
                    "message": "project already exists"
                }
                return flask.Response(
                    response=json.dumps(data),
                    status=200,
                    mimetype='application/json'
                )
            else:
                projects["projects"][project_name] = {}
                with open(app_data_path + "projects.json", "w+") as fp:
                    json.dump(projects, fp, indent = 4, default=str)
                    fp.close()
                data = {
                    "status": "success",
                    "message": "project created"
                }
                return flask.Response(
                    response=json.dumps(data),
                    status=200,
                    mimetype='application/json'
                )
        except Exception as exp:
            data = {
                "status": "error",
                "message": str(exp)
            }
            return flask.Response(
                response=json.dumps(data),
                status=500,
                mimetype='application/json'
            )
    else:
        data = {
            "status": "error",
            "message": "Only application/json accepted as payload"
        }
        return flask.Response(
            response=json.dumps(data),
            status=200,
            mimetype='application/json'
        )


@app.route("/deleteproject", methods=["POST"])
def deleteproject():
    if flask.request.content_type == "application/json":
        try:
            payload = json.loads(flask.request.data.decode("ascii"))
            with open(app_data_path + "projects.json", "r") as fp:
                projects = json.loads(fp.read())
            project_name = payload["name"]
            if project_name in list(projects["projects"].keys()):
                projects["projects"].pop(project_name)
                with open(app_data_path + "projects.json", "w+") as fp:
                    json.dump(projects, fp, indent = 4, default=str)
                    fp.close()
                data = {
                    "status": "success",
                    "message": "project deleted"
                }
                return flask.Response(
                    response=json.dumps(data),
                    status=200,
                    mimetype='application/json'
                )
            else:
                data = {
                    "status": "error",
                    "message": "project doesnt exist"
                }
                return flask.Response(
                    response=json.dumps(data),
                    status=200,
                    mimetype='application/json'
                )
                
        except Exception as exp:
            data = {
                "status": "error",
                "message": str(exp)
            }
            return flask.Response(
                response=json.dumps(data),
                status=500,
                mimetype='application/json'
            )
    else:
        data = {
            "status": "error",
            "message": "Only application/json accepted as payload"
        }
        return flask.Response(
            response=json.dumps(data),
            status=200,
            mimetype='application/json'
        )

if __name__ == "__main__":
    app.run(
        debug = True,
        host = host_ip
    )

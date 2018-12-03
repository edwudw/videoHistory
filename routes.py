from flask import request, render_template, redirect, url_for, Flask

app = Flask(__name__)
app.config["SECRET_KEY"] = "Highly secret key"

@app.route("/", methods=["GET", "POST"])
def index():
    return render_template("index.html")


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5000)


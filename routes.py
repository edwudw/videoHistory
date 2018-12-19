from flask import request, render_template, redirect, url_for, Flask, jsonify
import getMovies

app = Flask(__name__)
app.config["SECRET_KEY"] = "Highly secret key"

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        query = request.form["searchBox"]
        return redirect(getMovies.getTVImage(query), code=200)
    else:
        return render_template("index.html")

@app.route("/getShow/<showType>/<show>", methods=["GET", "POST"])
def getShow(showType, show):
    if showType == "movie":
        return redirect(getMovies.getMovieImage(show), code=200)
    else:
        return redirect(getMovies.getTVImage(show), code=200)

@app.route("/getImage", methods=["GET", "POST"])
def getImage():
    query = request.args.get("title")
    print(query)
    return jsonify(url=getMovies.getTVImage(query))

@app.route("/getShowTitles", methods=["GET", "POST"])
def getShowTitles():
    title = request.args.get("search")
    results = getMovies.getShowTitles(title, True)
    return jsonify(titles=results)


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5000)
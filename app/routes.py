from flask import request, render_template, redirect, url_for, Flask, jsonify
from . import getMovies
from app import app

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
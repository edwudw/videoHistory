import sys, requests, json

api_key = "50eba6471449a576a35ea1987dcff746"

def printJSON(data):
	print(json.dumps(data, indent=4))

def getConfig():
	base_url = "https://api.themoviedb.org/3/configuration"

	payload = {"api_key": api_key}

	response = requests.get(base_url, stream=True, params=payload)

	data = json.loads(response.content)

	returnString = data["images"]["base_url"] + data["images"]["poster_sizes"][0]
	return returnString

def getShow(show, tv):
	if tv == True:
		base_url = "https://api.themoviedb.org/3/search/tv"
	else:
		base_url = "https://api.themoviedb.org/3/search/movie"

	payload = {"api_key": api_key,
			   "query": show}

	response = requests.get(base_url, stream=True, params=payload)
	# print("response code: " + str(response.status_code))
	data = json.loads(response.content)
	# print(json.dumps(data, indent=4))
	printJSON(data)
	return data["results"][0]["poster_path"]
def getShowTitles(show, tv):
	if tv == True:
		base_url = "https://api.themoviedb.org/3/search/tv"
	else:
		base_url = "https://api.themoviedb.org/3/search/movie"

	payload = {"api_key": api_key,
			   "query": show}

	response = requests.get(base_url, stream=True, params=payload)
	data = json.loads(response.content)
	showArray = []
	for i in data["results"]:
		showArray.append(i["name"])
	return showArray
def getTVImage(show):
	return getConfig() + getShow(show, True)
def getMovieImage(movie):
	return getConfig() + getShow(movie, True)

if __name__ == '__main__':
	# url = getConfig() + 
	# print(getConfig() + getShow("Parks and Recreation", True))
	# print(getShow("parks", True))
	print(str(getShowTitles("parks", True)))
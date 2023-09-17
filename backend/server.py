from flask import Flask,request,jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app)


aList = ["dog","cat","ff"]

@app.route('/', methods=["GET","POST","PATCH","DELETE"])


def index():

    def getAlist():
        aDict = {}
        for index, item in enumerate(aList):
            aDict[index] = item

        return aDict


    if request.method == "GET" :

        data = getAlist()
    
        return jsonify(data),200
    

    elif request.method == "POST" : 

        try:
            a = request.get_json()['a']
            aList.append(a)

            data = getAlist()

            return jsonify(data),201
        
        except Exception as e:
            print(e)
            return "",404
            
    
    elif request.method == "PATCH" : 
        try:
            aIndex = int(request.get_json()["aIndex"])
            aNewValue = request.get_json()["aNewValue"]

            aList.pop(aIndex)
            aList.insert(aIndex, aNewValue)

            return "", 204


        except Exception as e :

            print(e)
            return "", 404
            
    
    elif request.method == "DELETE" : 
        
        try:

            aIndex = int(request.get_json()["aIndex"])
            aList.pop(aIndex)
            return "", 204
        
        except Exception as e :
            print(e)
            return "", 404
    
    else: jsonify({"Alert" : "Not Found"}), 404


if __name__ == "__main__":
    app.run(debug=True)
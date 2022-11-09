
from flask import Flask, request
import json
app = Flask(__name__)

@app.route("/allocate", methods=['POST'])
def get_optimal_allocation():
    res = request.get_json()
    return json.dumps({})

if __name__ == "__main__":
    app.run(port=5000) 
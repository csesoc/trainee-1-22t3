import json
import jsonschema
from jsonschema import validate


personSchema = {
    "type": "object",
    "properties": {
        "name": {"type": "string"},
        "suburb": {"type": "string"},
        "role": {"type": "string"},
    }
}

def validateJSON(jsonData):
    try:
        validate(instance=jsonData, schema=personSchema)
        json.loads(jsonData)
    except jsonschema.exceptions.ValidationError as err:
        return False
    return True



import json
import jsonschema
from jsonschema import validate


# Invariants:
# * everything is stored as lowercase strings in the backend.
#   frontend can do whatever it wants to do with it.
# * Response will strictly enforce proper noun naming.
personSchema = {
    "type": "object",
    "required": ["name", "suburb", "role"],
    "properties": {
        "name": {"type": "string"},
        "suburb": {
            "type": "object",
            "properties" : {
                    "name": {"type": "string"},
                    "lat": {"type" : "number"},
                    "lon": {"type" : "number"}
            }
        },
        "role": {"enum": ["driver", "passenger", "hotel"]}}
}


peopleSchema = {
    "type": "array",
    "items": {
        "type": personSchema
    }
}


def validateJSON(jsonData):
    try:
        validate(instance=jsonData, schema=peopleSchema)
        json.loads(jsonData)
    except jsonschema.exceptions.ValidationError as err:
        return False
    return True

    """_summary_
    schema_container: a list of dictionaries, each dictionary is a person schema.
    name: new person / hotel to be added in a str format
    suburb_name: name of the suburb to be added
    lat: latitude of the suburb to be added
    lon: longitude of the suburb to be added
    role: role of the person/ hotel to be added
    
    User constrained Invariants: 
    * If name is the hotel, the role must be a 'hotel'.
    """
def create_data(schema_container, name, suburb_name, lat, lon, role):
    name, suburb_name, role = name.lower(), suburb_name.lower(), role.lower()
    
    new_schema = { 
                  "name": name,
                  "suburb": {
                      "name": suburb_name,
                      "lat": lat,
                      "lon": lon,
                  },
                  "role": role,
    }
    
    schema_container.append(new_schema)
    return json.dumps(schema_container)

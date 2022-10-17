# 1. make a list of all the drivers suburbs and passengers suburbs
# 2. calcualte the distance from each driver to each passenger using 
# https://developers.google.com/optimization/routing/vrp#distance_matrix_api

# Example: 
# https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=Westleigh+NSW&destinations=Epping+NSW&key=AIzaSyBvChWmi1hl5drsquInQ-ag3OLpylkQC2E

# import requests
import json
from urllib.request import urlopen

def create_data():
	data = {}
	data['API_key'] = 'AIzaSyBvChWmi1hl5drsquInQ-ag3OLpylkQC2E'
	data['drivers'] = ['Mount+Colah+NSW',
						'Epping+NSW',
						'Roseville+NSW',
						'Ryde+NSW',
						'North+Ryde+NSW'
						]
	data['people'] = ['Westleigh+NSW',
						'Marsfield+NSW',
						'Wahroonga+NSW',
						'Epping+NSW',
						'Beverly+Hills+NSW',
						'Matraville+NSW',
						'Epping+NSW',
						'Chatswood+NSW',
						'North+Sydney+NSW',
						'Marsfield+NSW',
						'Ryde+NSW',
						'Strathsfield+NSW',
						'Burwood+NSW',
						'Wareemba+NSW',
						'Pymble+NSW',
						'Eastwood+NSW',
						'Newtown+NSW',
						]
	return data

# Calculates distance betweeen each driver and all the people
def create_distance_matrix(data):
	people = data['people']
	drivers = data['drivers']
	API_key = data["API_key"]

	origin_addresses = drivers
	dest_addresses = people
	distance_matrix = []

	response = send_request(origin_addresses, dest_addresses, API_key)
	distance_matrix += build_distance_matrix(response)

	return distance_matrix

# Calculate distance between all the people
# def create_distance_matrix(data):
# 	addresses = data["people"]
# 	API_key = data["API_key"]

# 	# Distance Matrix API only accepts 100 elements per request, so get rows in multiple requests.
# 	max_elements = 100
# 	num_addresses = len(addresses) # 16 in this example.

# 	# Maximum number of rows that can be computed per request (6 in this example).
# 	max_rows = max_elements // num_addresses

# 	# num_addresses = q * max_rows + r (q = 2 and r = 4 in this example).
# 	q, r = divmod(num_addresses, max_rows)
# 	dest_addresses = addresses
# 	distance_matrix = []

# 	# Send q requests, returning max_rows rows per request.
# 	for i in range(q):
# 		origin_addresses = addresses[i * max_rows: (i + 1) * max_rows]
# 		response = send_request(origin_addresses, dest_addresses, API_key)
# 		distance_matrix += build_distance_matrix(response)

# 	# Get the remaining remaining r rows, if necessary.
# 	if r > 0:
# 		origin_addresses = addresses[q * max_rows: q * max_rows + r]
# 		response = send_request(origin_addresses, dest_addresses, API_key)
# 		distance_matrix += build_distance_matrix(response)

# 	return distance_matrix

def send_request(origin_addresses, dest_addresses, API_key):
	""" Build and send request for the given origin and destination addresses."""
	def build_address_str(addresses):
		# Build a pipe-separated string of addresses
		address_str = ''
		for i in range(len(addresses) - 1):
			address_str += addresses[i] + '|'
			address_str += addresses[-1]
		return address_str

	request = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial'
	origin_address_str = build_address_str(origin_addresses)
	dest_address_str = build_address_str(dest_addresses)
	request = request + '&origins=' + origin_address_str + '&destinations=' + \
						dest_address_str + '&key=' + API_key
	jsonResult = urlopen(request).read()
	response = json.loads(jsonResult)
	return response

def build_distance_matrix(response):
	distance_matrix = []
	for row in response['rows']:
		row_list = [row['elements'][j]['distance']['value'] for j in range(len(row['elements']))]
		distance_matrix.append(row_list)
	return distance_matrix

########
# Main #
########
def main():
	data = create_data()
	distance_matrix = create_distance_matrix(data)
	print(distance_matrix)

if __name__ == '__main__':
	main()
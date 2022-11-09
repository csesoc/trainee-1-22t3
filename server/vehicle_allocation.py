
from venv import create
from ortools.constraint_solver import routing_enums_pb2
from ortools.constraint_solver import pywrapcp

def create_data_model():

    data = {}
    data['distance_matrix'] = [
        [
        ]]
    data['hotel'] = 0
    
    data['demands'] = [1 for _ in range(len(data['distance_matrix']))]
    data['vehicle_capacities'] = [5, 5, 5, 5, 4, 5, 4, 5, 5]
    data['starts']          = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    '''
        "Maroubra", # 
        "Kensington",# 
        "Minto", #
        "Carlingford", #
        "Penshurst", #
        "Mascot", # 
        "Hurstville", # 
        "Banksia", #
        "Marsden Park", # 
    
    '''
    data['ends']            = [data['hotel'] for i in range(len(data['starts']))]
    data['num_vehicles'] = len(data['starts'])
    return data


def print_solution(data, manager, routing, solution):
    suburbs = [
        "RT House",
        "Maroubra", # 
        "Kensington",# 
        "Minto", #
        "Carlingford", #
        "Penshurst", #
        "Mascot", # 
        "Hurstville", # 
        "Banksia", #
        "Marsden Park", #
        "Kogarah",
        "Rockdale",
        "Hurstville",
        "Kogarah",
        "West Pennant Hills",
        "Baulkham Hills",
        "North Ryde",
        "Burwood",
        "Ermington",
        "Parramatta",
        "Penshurst",
        "Beecroft",
        "Sylvania",
        "Carlingford",
        "Kingsford",
        "Liverpool",
        "Campsie",
        "Newtown",
        "Croydon",
        "Greystanes",
        "Carlingford",
        "Eastwood",
        "Jannali",
        "Epping",
        "Epping",
        "Rhodes",
        "Ermington",
        "Rhodes",
        "Baulkham Hills",
        "Auburn",
        "Turramurra",
        "Kensington",
        "Hunters Hill",
    ]
    """Prints solution on console."""
    print(f'Objective: {solution.ObjectiveValue()}')
    total_distance = 0
    total_load = 0
    for vehicle_id in range(data['num_vehicles']):
        index = routing.Start(vehicle_id)
        plan_output = 'Route for vehicle {}:\n'.format(vehicle_id)
        route_distance = 0
        route_load = 0
        while not routing.IsEnd(index):
            node_index = manager.IndexToNode(index)
            route_load += data['demands'][node_index]
            plan_output += ' {0} [{1}] -> '.format(suburbs[node_index], route_load)
            previous_index = index
            index = solution.Value(routing.NextVar(index))
            route_distance += routing.GetArcCostForVehicle(
                previous_index, index, vehicle_id)
        plan_output += ' {0} [{1}]\n'.format(suburbs[manager.IndexToNode(index)],
                                                 route_load)
        plan_output += 'Distance of the route: {}m\n'.format(route_distance)
        plan_output += 'Total passengers picked up: {}\n'.format(route_load)
        print(plan_output)
        total_distance += route_distance
        total_load += route_load
    print('Total distance of all routes: {}m'.format(total_distance))
    print('Total passengers of all routes: {}'.format(total_load))


def main():
    """Solve the CVRP problem."""
    # Instantiate the data problem.
    data = create_data_model()

    # Create the routing index manager.
    manager = pywrapcp.RoutingIndexManager(len(data['distance_matrix']),
                                           data['num_vehicles'], data['starts'], data['ends'])
    
    routing = pywrapcp.RoutingModel(manager)


    # Create and register a transit callback.
    def distance_callback(from_index, to_index):
        """Returns the distance between the two nodes."""
        # Convert from routing variable Index to distance matrix NodeIndex.
        from_node = manager.IndexToNode(from_index)
        to_node = manager.IndexToNode(to_index)
        return data['distance_matrix'][from_node][to_node]

    transit_callback_index = routing.RegisterTransitCallback(distance_callback)

    # Define cost of each arc.
    routing.SetArcCostEvaluatorOfAllVehicles(transit_callback_index)


    # Add Capacity constraint
    def demand_callback(from_index):
        """Returns the demand of the node."""
        # Convert from routing variable Index to demands NodeIndex.
        from_node = manager.IndexToNode(from_index)
        return data['demands'][from_node]

    demand_callback_index = routing.RegisterUnaryTransitCallback(
        demand_callback)
    routing.AddDimensionWithVehicleCapacity(
        demand_callback_index,
        0, 
        data['vehicle_capacities'],
        True, 
        'Capacity')
    
    # for vehicle_id  in range(data['num_vehicles']):
    #     visited_nodes = set(routing.Start(vehicle_id))
    #     curr = 0
    #     while not routing.IsEnd(index):
    #         if curr not in visited_nodes:
    #             visited_nodes.add(curr)
    #         else:
    #             routing.solver().Add(routing.NextVar(curr).Contains(index) == 0)
    #         index = solution.Value(routing.NextVar(index))
    #         curr += 1
        
    # routing.solver().Add(routing.VehicleVar)

    # Setting first solution heuristic.
    search_parameters = pywrapcp.DefaultRoutingSearchParameters()
    search_parameters.first_solution_strategy = (
        routing_enums_pb2.FirstSolutionStrategy.PARALLEL_CHEAPEST_INSERTION)
    search_parameters.local_search_metaheuristic = (
        routing_enums_pb2.LocalSearchMetaheuristic.GUIDED_LOCAL_SEARCH)
    search_parameters.time_limit.FromSeconds(1)

    solution = routing.SolveWithParameters(search_parameters)

    if solution:
        print_solution(data, manager, routing, solution)
    else: 
        print("No solution found - Possibly need more vehicles")
main()
data = create_data_model()
print(len(data['distance_matrix']))
print(len(data['distance_matrix'][0]))

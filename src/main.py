print("Hello, World!")
# write square of a number
def square(num):
    return num * num    

print(square(5))  # Output: 25  

# Distribute House seats with the Huntington-Hill method.
def distribute_representatives(states, total_seats=435):
    """Return the number of House seats apportioned to each state.

    ``states`` maps state names to populations. Every state receives one
    guaranteed seat before the remaining seats are assigned by priority.
    """
    if not states:
        raise ValueError("At least one state is required")
    if total_seats < len(states):
        raise ValueError("There must be at least one seat per state")
    if any(population <= 0 for population in states.values()):
        raise ValueError("Populations must be positive")

    seats = {state: 1 for state in states}

    for _ in range(total_seats - len(states)):
        state = max(
            states,
            key=lambda name: states[name] / (seats[name] * (seats[name] + 1)) ** 0.5,
        )
        seats[state] += 1

    return seats

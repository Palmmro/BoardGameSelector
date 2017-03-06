import random
import sys


class BoardGame:
    time = 3
    min_players = 2
    max_players = 5

    # def __init__(self, name, time, min_players, max_players):
    #     self.name = name
    #     self.time = time
    #     self.minPlayers = min_players
    #     self.maxPlayers = max_players

    def __init__(self, name):
        self.name = name

    def get_time(self):
        return self.time

    def get_min(self):
        return self.min_players

    def get_max(self):
        return self.max_players
# BoardGame

# should be dynamic...
num_lines = 158

games_file = open("drawit_games.txt", 'r', encoding="utf-16")
games_list = []
prefered_games_list = []
arg_numplayers = -1
arg_time = -1
arglist = sys.argv

# get args
if len(arglist) >= 2:
    arg_numplayers = int(arglist[1])
    arg_time = int(arglist[2])

# add all games from file to games_list
for i in range(0, num_lines):
    games_list.append(BoardGame(games_file.readline()))

# add games to prefered_games_list based on args
for game in games_list:
    if game.time <= arg_time\
            and game.min_players <= arg_numplayers <= game.max_players:
        prefered_games_list.append(game)
    elif arg_numplayers == -1 and arg_time == -1:   # could be optimized better
        prefered_games_list.append(game)

# creates random int if needed
rand_int = 0
if len(prefered_games_list) > 1:
    rand_int = random.randint(0, len(prefered_games_list)-1)

# prints random game if found
if len(prefered_games_list) > 0:
    print(prefered_games_list[rand_int].name)
else:
    print("No such game")

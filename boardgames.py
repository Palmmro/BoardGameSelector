import random
import sys
from itertools import (takewhile, repeat)


class BoardGame:
    def __init__(self, name, min_players, max_players, time):
        self.name = name
        self.time = time
        self.minPlayers = min_players
        self.maxPlayers = max_players

    def to_string(self):    # used for debugging
        print("Name: "+self.name+"\nMin: "+str(self.minPlayers)+"\nMax: "+str(self.maxPlayers)+"\nTime: "+str(self.time))
# //BoardGame


# returns number of lines in file with filename
def get_num_lines(filename):
    file = open(filename, 'rb')
    bufgen = takewhile(lambda x: x, (file.raw.read(1024*1024) for _ in repeat(None)))
    return sum(buf.count(b'\n') for buf in bufgen if buf) + 1

file_name = "test_games.txt"    # file should be in format "name" <tab> "min" <tab> "max" <tab> "time"
games_file = open(file_name, 'r', encoding="utf-16")
num_lines = get_num_lines(file_name)
games_list = []
prefered_games_list = []
arg_numplayers = -1
arg_time = -1
arglist = sys.argv
INF_INT = 1000000000

# get args
if len(arglist) >= 2:
    arg_numplayers = int(arglist[1])
    arg_time = int(arglist[2])


# help method in adding attributes to game
def get_str_before_tab(in_str):
    tab_1 = in_str.find('\t')
    if tab_1 == -1:
        return in_str
    ret_str = in_str[:tab_1]
    return ret_str

# add all games from file to games_list, and also attributes
games_file.readline()
for i in range(1, num_lines):
    tempStr = games_file.readline()
    nameStr = get_str_before_tab(tempStr)
    tempStr = tempStr[tempStr.find('\t') + 1:]
    minStr = get_str_before_tab(tempStr)
    tempStr = tempStr[tempStr.find('\t') + 1:]
    maxStr = get_str_before_tab(tempStr)
    tempStr = tempStr[tempStr.find('\t') + 1:]
    timeStr = get_str_before_tab(tempStr)
    if maxStr == "inf":
        maxStr = INF_INT
    games_list.append(BoardGame(nameStr, int(minStr), int(maxStr), int(timeStr)))

# add games to prefered_games_list based on args
for game in games_list:
    if game.time <= arg_time\
            and game.minPlayers <= arg_numplayers <= game.maxPlayers:
        prefered_games_list.append(game)
    elif arg_numplayers == -1 and arg_time == -1:   # could be optimized better, check if -1 first,
        prefered_games_list.append(game)            # should also check one by one

# creates random int if needed
rand_int = 0
if len(prefered_games_list) > 1:
    rand_int = random.randint(0, len(prefered_games_list)-1)

# prints random game if found
if len(prefered_games_list) > 0:
    print(prefered_games_list[rand_int].name)
else:
    print("No such game")

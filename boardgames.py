class BoardGame:
    # name = "namn"
    time = 20
    min_players = 2
    max_players = 5

    # def __init__(self, name, time, min_players, max_players):
    #     self.name = name
    #     self.time = time
    #     self.minPlayers = min_players
    #     self.maxPlayers = max_players

    def __init__(self, name):
        self.name = name

    def gettime(self):
        return self.time

    def get_min(self):
        return self.min_players
# BoardGame


def file_len(fname):
    with open(fname) as f:
        for j, l in enumerate(f):
            pass
    return j + 1

num_lines = 158
games_file = open("drawit_games.txt", 'r', encoding="utf-16")
games_list = []
for i in range(0, num_lines):
    games_list.append(BoardGame(games_file.readline()))

for i in range(0, num_lines):
    print(games_list[i].get_min())



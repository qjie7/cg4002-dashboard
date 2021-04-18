# This file tests if the sending to the database is ok. (Data format and connection)

# runboth commands
# pip3 install pymongo
# pip3 install pymongo[srv]
import pymongo
import random
from datetime import datetime
import time


# from sshtunnel import SSHTunnelForwarder

def connectToDatabase():
    connection_string = 'mongodb+srv://qianjie:19930927QJ@cluster0.6fcdx.mongodb.net/dummy?ssl=true&ssl_cert_reqs=CERT_NONE'
    client = pymongo.MongoClient(connection_string)
    return client


# For dancer 1
def sendToCollectionDatas(client, msg):
    db = client.get_database('dummy')
    collection = db.datas
    collection.insert_one(msg)


# For dancer 2
def sendToCollectionDatas2(client, msg):
    db = client.get_database('dummy')
    collection = db.datas2
    collection.insert_one(msg)


# For dancer 3
def sendToCollectionDatas3(client, msg):
    db = client.get_database('dummy')
    collection = db.datas3
    collection.insert_one(msg)


# For evaluated answer
def sendToCollectionDatas4(client, msg):
    db = client.get_database('dummy')
    collection = db.datas4
    collection.insert_one(msg)


# the code below will be placed somewhere in the main program on the ultra96
# at some point, the connection to database will be made
# at some point, the connection made will be used to send data to the database.
# this means some processing has to happen somewhere, such that depending on the type of data,
# the database knows what to update.

# First create connection to database based on connection string.
# Then based on whether the data is coming from dancer1,2,3 or evaluation answer, insert it to the respective collection in the database.
# Note that only dancer_1 has the physical emg connected. So for dancer_2 and _3, the insertion do not include emg field.
# dance_move for the dancer refers to the dance move that the ml predicts that repective dancer is dancing.
# dance_move for the evaluation answer is the most common dance_move out of all 3 dancers.
def main():
    client = connectToDatabase()
    print("Connected to database - ", client)
    list1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]  # simulate gyro and acceleration xyz left and right
    danceMove1 = ["Hair", "Gun", "ElbowKick", "Wipe-Table", "Side-Pump"]
    danceMove2 = ["Hair", "Gun", "ElbowKick", "Wipe-Table", "Side-Pump"]
    danceMove3 = ["Hair", "Gun", "ElbowKick", "Wipe-Table", "Side-Pump"]
    # list3 = [[1,2,3],[1,3,2],[2,1,3],[2,3,1], [3,1,2], [3,2,1]]
    list3 = ["1 2 3", "1 3 2", "2 1 3", "2 3 1", "3 1 2", "3 2 1", ""]
    # New data to be sent over to database
    while True:
        a = random.choice(list1)
        b = random.choice(list1)
        c = random.choice(list1)
        send_time = str(datetime.now())[11:19]
        dance_move1 = random.choice(danceMove1)
        dance_move2 = random.choice(danceMove2)
        dance_move3 = random.choice(danceMove3)

        final_dance_move = random.choice([dance_move1, dance_move2, dance_move3])
        final_position = random.choice(list3)
        final_delay = round(random.uniform(0, 1), 4)

        data_to_send_a = f"{a},{b},{c},{a},{b},{c},{a},{b},{c},{a},{b},{c},{send_time},{a},{dance_move1}"
        data_to_send_b = f"{b},{c},{a},{b},{c},{a},{b},{c},{a},{b},{c},{a},{send_time},{b},{dance_move2}"
        data_to_send_c = f"{c},{b},{a},{c},{b},{a},{c},{b},{a},{c},{b},{a},{send_time},{c},{dance_move3}"
        data_to_send_eval = f"{final_dance_move},{final_position},{final_delay}"

        split_data_a = data_to_send_a.split(',')
        print(split_data_a)
        split_data_b = data_to_send_b.split(',')
        print(split_data_b)
        split_data_c = data_to_send_c.split(',')
        print(split_data_c)
        split_data_eval = data_to_send_eval.split(',')
        print(split_data_eval)

        a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15 = split_data_a
        b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15 = split_data_b
        c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14, c15 = split_data_c
        d1, d2, d3 = split_data_eval

        data_to_send_datas = {
            # Required Datas
            "xAxisLeaderLeftA": a1,
            "yAxisLeaderLeftA": a2,
            "zAxisLeaderLeftA": a3,
            "xAxisLeaderLeftG": a4,
            "yAxisLeaderLeftG": a5,
            "zAxisLeaderLeftG": a6,
            "xAxisLeaderRightA": a7,
            "yAxisLeaderRightA": a8,
            "zAxisLeaderRightA": a9,
            "xAxisLeaderRightG": a10,
            "yAxisLeaderRightG": a11,
            "zAxisLeaderRightG": a12,
            "time": a13,
            "EMG": a14,
             "danceMove": a15,

            # # Below data can be dummy for week9
            # "position": [1, 2, 3],
            # "accuracy": 100,
            # "sync": 1.5
        }

        data_to_send_datas2 = {
            # Required Datas
            "xAxisMemberOneLeftA": b1,
            "yAxisMemberOneLeftA": b2,
            "zAxisMemberOneLeftA": b3,
            "xAxisMemberOneLeftG": b4,
            "yAxisMemberOneLeftG": b5,
            "zAxisMemberOneLeftG": b6,
            "xAxisMemberOneRightA": b7,
            "yAxisMemberOneRightA": b8,
            "zAxisMemberOneRightA": b9,
            "xAxisMemberOneRightG": b10,
            "yAxisMemberOneRightG": b11,
            "zAxisMemberOneRightG": b12,
            "time": b13,
            # "EMG": a14,
             "danceMove": b15,

            # # Below data can be dummy for week9
            # # "position": [1, 2, 3],
            # "accuracy": 100,
            # "sync": 1.5
        }

        data_to_send_datas3 = {
            # Required Datas
            "xAxisMemberTwoLeftA": c1,
            "yAxisMemberTwoLeftA": c2,
            "zAxisMemberTwoLeftA": c3,
            "xAxisMemberTwoLeftG": c4,
            "yAxisMemberTwoLeftG": c5,
            "zAxisMemberTwoLeftG": c6,
            "xAxisMemberTwoRightA": c7,
            "yAxisMemberTwoRightA": c8,
            "zAxisMemberTwoRightA": c9,
            "xAxisMemberTwoRightG": c10,
            "yAxisMemberTwoRightG": c11,
            "zAxisMemberTwoRightG": c12,
            "time": c13,
            # "EMG": a14,
             "danceMove": c15,

            # # Below data can be dummy for week9
            # "position": [1, 2, 3],
            # "accuracy": 100,
            # "sync": 1.5
        }

        data_to_send_datas4 = {
            # # Required Datas
            # "xAxisMemberTwoLeftA": c1,
            # "yAxisMemberTwoLeftA": c2,
            # "zAxisMemberTwoLeftA": c3,
            # "xAxisMemberTwoLeftG": c4,
            # "yAxisMemberTwoLeftG": c5,
            # "zAxisMemberTwoLeftG": c6,
            # "xAxisMemberTwoRightA": c7,
            # "yAxisMemberTwoRightA": c8,
            # "zAxisMemberTwoRightA": c9,
            # "xAxisMemberTwoRightG": c10,
            # "yAxisMemberTwoRightG": c11,
            # "zAxisMemberTwoRightG": c12,
            # "time": c13,
            # # "EMG": a14,
            # "danceMove": c15,

            # Below data can be dummy for week9
            "finalDanceMove": d1,
            "finalPosition": d2,
            # "accuracy": 100,
            "finalSync": d3
        }

        print("Sending to database for Dancer 1 - ", data_to_send_datas)
        sendToCollectionDatas(client, data_to_send_datas)
        print("Sent to datas!")

        print("Sending to database for Dancer 2 - ", data_to_send_datas2)
        sendToCollectionDatas2(client, data_to_send_datas2)
        print("Sent to datas2!")

        print("Sending to database for Dancer 3 - ", data_to_send_datas3)
        sendToCollectionDatas3(client, data_to_send_datas3)
        print("Sent to datas3!")

        print("Sending to database for Final Eval - ", data_to_send_datas4)
        sendToCollectionDatas4(client, data_to_send_datas4)
        print("Sent to datas4!")

        time.sleep(2)  # 0.05s to simulate 20hz


if __name__ == '__main__':
    main()

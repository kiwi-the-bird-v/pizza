# A very simple Flask Hello World app for you to get started with...

from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from flask_cors import CORS

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'liptonv.mysql.pythonanywhere-services.com'
app.config['MYSQL_USER'] = 'liptonv'
app.config['MYSQL_PASSWORD'] = 'Multiversum8'
app.config['MYSQL_DB'] = 'liptonv$pizza_info'
# app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)
cors = CORS(app)


@app.route('/')
def hello_world():
    return 'Hello from Flask!'


@app.route('/dollar_to_euro')
def dollar_to_euro():
    return jsonify({'coefficient': 0.83,
                    'deliveryCost': 3})


@app.route('/get_pizza')
def get_pizza():
    data = {
   "pizzas":[
      {
         "image":"1HsSHvj7UPs0QevCTm_TRHL9tupqF-inq",
         "ingredients":[
            "peperoni",
            "cheese",
            "ketchup"
         ],
         "price":7.99,
         "title":"Peperoni"
      },
      {
         "image":"1zZgPZUW7lBsDS1GwUeFGVPN1U1Wyuzzb",
         "ingredients":[
            "ketchup",
            "bluecheese",
            "tomato"
         ],
         "price":5.49,
         "title":"Margarita"
      },
      {
         "image":"1hj-Me-uWymKJjB8RX_MDpnwReUF3pmjZ",
         "ingredients":[
            "beef",
            "cheese",
            "ketchup",
            "pork"
         ],
         "price":12.99,
         "title":"Meat"
      },
      {
         "image":"1AYfSsDvfSQnocMGbvcepfV8_eZR92LSF",
         "ingredients":[
            "ananas",
            "cheese",
            "chicken"
         ],
         "price":9.9,
         "title":"Tropikana"
      },
      {
         "image":"1e1SJ3WVU-C6hE-vnkiqzZtoexxYacuSG",
         "ingredients":[
            "chicken",
            "cheese",
            "mayonnaise"
         ],
         "price":9.99,
         "title":"Julien"
      },
      {
         "image":"1Yjke2kHoLQ0fOWnC1P8CTsrTf2-V4TdP",
         "ingredients":[
            "chili",
            "cheese",
            "mayonnaise"
         ],
         "price":4.89,
         "title":"Hot"
      },
      {
         "image":"1qNa_3WgcLfAA_tVgeEpm-a8AUQ80Pkwq",
         "ingredients":[
            "blueberry",
            "chocolate",
            "sugar"
         ],
         "price":1.99,
         "title":"Sweet"
      },
      {
         "image":"1OJ342-J0d_BeoGLdkL_4VFVjIhIFEgct",
         "ingredients":[
            "bluecheese",
            "cheese",
            "whitecheese"
         ],
         "price":8.89,
         "title":"Cheesy"
      },
      {
         "image":"1V2pD6rus2y-zdVhZICBEQSYMrVP-Fibo",
         "ingredients":[
            "tomato",
            "cucumber",
            "ananas"
         ],
         "price":2.99,
         "title":"Vegetarian"
      },
      {
         "image":"1ST8SisWQ3iwsryPh8zuhW2Qory6Pf_gQ",
         "ingredients":[
            "chicken",
            "chocolate",
            "chili"
         ],
         "price":5.4,
         "title":"Surprise"
      }
   ]
}

    return jsonify(data)


@app.route('/get_orders_by_user_id', methods=['POST'])
def get_orders_by_user_id():
    from_front = request.get_json()
    user_id = from_front.get('userId')
    cur = mysql.connection.cursor()
    cur.execute('''SELECT user_id,
                          orders,
                          total_price,
                          address,
                          phone_number,
                          exchange_rate, date

                   FROM history_orders
                   WHERE user_id={}'''.format(user_id))
    rv = cur.fetchall()
    response = []
    for elem in rv:
        response.append(
                {
            'userId': elem[0],
            'orders': elem[1],
            'totalPrice': elem[2],
            'address': elem[3],
            'phoneNumber': elem[4],
            'exchangeRate': elem[5],
            'date': elem[6],
        })
    print(response)
    return jsonify({'data': response})


@app.route('/insert_order', methods=['POST'])
def insert_order():
    from_front = request.get_json()
    user_id = from_front.get('userId')
    if not user_id or user_id == '':
        return jsonify(
            {'status': True,
            'id': 'without'}
            )
    orders = from_front.get('order', '')
    total_price = from_front.get('orderSum', '')
    address = from_front.get('address', '')
    phoneNumber = from_front.get('phoneNumber', '')
    exchangeRate = from_front.get('exchangeRate', '')
    date_d = from_front.get('date', '')
    print('orders={}, total_price={}, address={},phoneNumber={}, exchangeRate={}, user_id={}, date_d={}'.format(
        orders,total_price, address, phoneNumber, exchangeRate, user_id, date_d)
        )
    cur = mysql.connection.cursor()
    cur.execute('''INSERT INTO history_orders (user_id,
                                               orders,
                                               total_price,
                                               address,
                                               phone_number,
                                               exchange_rate,
                                               date)
                                VALUES (
                                    {},
                                    '{}',
                                    {},
                                    '{}',
                                    '{}',
                                    '{}',
                                    '{}')'''.format(
                                        user_id,
                                        orders,
                                        total_price,
                                        address,
                                        phoneNumber,
                                        exchangeRate,
                                        date_d)
                )
    mysql.connection.commit()
    return jsonify(
            {'status': True,
            'id': 'with'}
            )


@app.route('/reset_orders')
def reset_orders():
    cur = mysql.connection.cursor()
    cur.execute('''DELETE FROM history_orders;''')
    mysql.connection.commit()
    return "Done reset orders!"


@app.route('/reset_users')
def reset_users():
    cur = mysql.connection.cursor()
    cur.execute('''DELETE FROM user_info;''')
    mysql.connection.commit()
    return "Done reset users info!"


@app.route('/get_all_users')
def get_all_users():
    cur = mysql.connection.cursor()
    cur.execute('''SELECT * FROM user_info ''')
    rv = cur.fetchall()
    return jsonify({'users': str(rv)})


@app.route('/register_user', methods=['GET', 'POST'])
def register_user():
    from_front = request.get_json()
    login = from_front.get('login')
    password = from_front.get('password')
    cur = mysql.connection.cursor()
    cur.execute('''SELECT *
                   FROM user_info
                   WHERE login='{}' '''.format(login))
    rv = cur.fetchall()
    if rv:
        return jsonify(
            {'status': False,
            'error': 'user exist'})

    cur.execute('''INSERT INTO user_info(login, password )
                                VALUES ('{}', '{}')'''.format(login, password))
    mysql.connection.commit()
    cur.execute('''SELECT * FROM user_info WHERE user_id = LAST_INSERT_ID()''')
    rv = cur.fetchall()[0][0]
    return jsonify({'inserted_id': str(rv)})


@app.route('/login_user', methods=['POST'])
def login_user():
    from_front = request.get_json()
    login = from_front.get('login')
    password = from_front.get('password')
    cur = mysql.connection.cursor()
    cur.execute('''SELECT user_id
                   FROM user_info
                   WHERE login='{}' AND password='{}' '''.format(login, password))
    rv = cur.fetchall()

    return jsonify({'id': rv[0][0]})
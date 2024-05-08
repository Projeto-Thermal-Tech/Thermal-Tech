import psycopg2

def get_data(query):
    # Conecte-se ao seu banco de dados
    conn = psycopg2.connect(
        dbname="banco_tt",
        user="postgres",
        password="123456",
        host="34.151.204.122",
        port="5432"
    )

    # Crie um cursor
    cur = conn.cursor()

    # Execute a consulta SQL
    cur.execute(query)

    # Obtenha os resultados
    results = cur.fetchall()

    # Feche a conexão
    cur.close()
    conn.close()

    return results
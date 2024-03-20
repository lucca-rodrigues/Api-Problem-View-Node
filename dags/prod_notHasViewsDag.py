from airflow import DAG
from airflow.operators.bash_operator import BashOperator
from datetime import datetime, timedelta

default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'start_date': datetime(2023, 4, 12, 12, 0, 0),
    'retries': 1,
    'retry_delay': timedelta(minutes=1),
}

dag = DAG(
    'problem_not_has_views_dag',
    default_args=default_args,
    description='',
    schedule_interval="0 12 * * *",
    tags=["prod"]
)

api_url = 'API_HERE/api/v1/views/history'

curl_command = f'curl -X GET {api_url} -H "Content-Type: application/json"'

call_task = BashOperator(
    task_id='problem_not_views_dag',
    bash_command=curl_command,
    dag=dag,
)

store_task = BashOperator(
    task_id='store_external_data',
    bash_command='echo {{ ti.xcom_pull(task_ids="problem_not_views_dag") }}',
    dag=dag,
)

call_task >> store_task

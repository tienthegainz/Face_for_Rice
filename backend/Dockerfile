FROM python:3.6.9
WORKDIR /app/backend
COPY ./requirements.txt ./requirements.txt

RUN pip install -r requirements.txt

COPY . .

# start app
CMD ["python", "main.py"]

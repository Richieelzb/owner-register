# Stage 1 - Generate HTML

FROM python:3.12-slim AS builder

WORKDIR /app

COPY . .

RUN python src/index.py


# Stage 2 - Serve HTML

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/website/ \
    /usr/share/nginx/html/

COPY --from=builder /app/badges/ \
    /usr/share/nginx/html/badges/

EXPOSE 80


# FROM python:3.12-slim AS builder

# WORKDIR /app

# COPY . .

# RUN python psl-log-etc/src/build_all.py

# RUN python epl-log-etc/src/build_all.py

# RUN python index.py


# FROM nginx:alpine

# RUN rm -rf /usr/share/nginx/html/*

# COPY --from=builder /app/website/ \
#     /usr/share/nginx/html/

# EXPOSE 80

import http.server
import socketserver
import time

class MyHandler(http.server.BaseHTTPRequestHandler):

    # checks if url has already been checked
    def check(self, url):
        with open("urls_list", 'r', encoding='utf-8') as f:
            urls = f.read().split('\n')
            return (url in urls)

    #Adds new URL to file
    def add(self, url):
        with open("urls_list", 'a', encoding='utf-8') as f:
            f.write(url + '\n')

    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "text/plain")
        self.end_headers()

        if 1: #"checkURL" in self.headers:
            self.wfile.write(str(self.check(self.path[1:])).encode())

    def do_POST(self):
        self.send_response(200)
        self.send_header("Content-type", "text/plain")
        self.end_headers()

        if "sendURL" in self.headers:
            self.add(self.path[1:])
            self.wfile.write("Added site")
                
            


HOST_NAME = '0.0.0.0'
PORT_NUMBER = 80

server_class = http.server.HTTPServer
httpd = server_class((HOST_NAME, PORT_NUMBER), MyHandler)
print(time.asctime(), "Server Starts - %s:%s" % (HOST_NAME, PORT_NUMBER))
try:
    httpd.serve_forever()
except KeyboardInterrupt:
    pass
httpd.server_close()
print(time.asctime(), "Server Stops - %s:%s" % (HOST_NAME, PORT_NUMBER))




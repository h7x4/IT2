#!/usr/bin/env python3
from distutils import file_util
import os
import fileinput
import json
from sys import argv
from shutil import rmtree

#Copy CSS
file_util.copy_file('../resources/css/main.css', './resources/css/main.css')

jsonPath = './resources/js/tasksJSON.js'
jsonData = {}
jsonData['tasks'] = []
numberOfTasks = int(input('Number of tasks: '))

for i in range(0, numberOfTasks):
  #Define variables
  realTaskNumber = i+1
  dirPath = './oppgaver/oppgave' + str(realTaskNumber) + '/'
  htmlPath = dirPath + 'oppgave.html'
  jsPath = dirPath + 'oppgave.js'

  #Make html file
  with open('./task-template/oppgave.html', 'r') as file:
    data = file.read()
  data = data.replace("taskNumber", str(realTaskNumber))
  os.makedirs(dirPath)
  with open(htmlPath, 'w') as file:
    file.write(data)
  
  #Make js file
  with open(jsPath, 'w') as file:
    file.write('')

  #Add to JSON
  jsonData['tasks'].append({
  'name': 'Oppgave ' + str(realTaskNumber),
  'path': str(htmlPath)
})

jsVariable = "const tasks = " + json.dumps(jsonData)

#Update JSON
with open(jsonPath, 'w') as file:
  file.write(jsVariable)

#Delete the template
deleteBool = input('Delete the template? (yes/No): ')
if deleteBool == "yes":
  rmtree('./task-template', ignore_errors=True)

#Delete itself
deleteBool = input('Delete the program? (yes/No): ')
if deleteBool == "yes":
  os.remove(argv[0])
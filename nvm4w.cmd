@echo off
setlocal

set "beginComment=goto :endComment"

%beginComment%
> nvm current
v20.17.0
> nvm list
  * 20.17.0 (Currently using 64-bit executable)
    16.19.1
    14.19.1
    11.15.0
> if current doesn't match package.json/engines.node expression then find the matching version (e.g. the biggest if node: ">=x.x.x") and use it
> if previous fails then nvm install & nvm use package.json/engines.node value (stripped of conditions)
:endComment

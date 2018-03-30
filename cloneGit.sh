#!/bin/zsh
for i in "$@";
do
    git clone https://github.com/Feather130/$i.git
done


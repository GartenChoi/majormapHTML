# 카페24 스마트디자인 html -> 일반 html로 바꿈.
# asset 폴더 전체복사. component 폴더는 css만 복사.
# @import만 사용함. @layout, @css, @js, 변수 쓸 거면 코드 추가해야 함.
# 카페24에서 <input/> <img/> 안 됨 -> <input></input>으로 쓰고 <input/>으로 변환함.
# 카페24에서 제이쿼리 쓰면 충돌발생. jqNoConflict로 바꾸고 owl.carousel js jquery 충돌 수정.

import os
import shutil

def makedir():
    if os.path.isdir('./mergeComponents'):
        shutil.rmtree('./mergeComponents')
    os.mkdir('./mergeComponents')
    shutil.copytree('./assets', './mergeComponents/assets')
    shutil.copytree('./components', './mergeComponents/components', ignore=shutil.ignore_patterns('*.html'))

def writefile(filename,write):
    read=open('./'+filename,'r',encoding='utf-8')
    for line in read.readlines():
        if line.strip().startswith('<!--@import('):
            writefile('components/'+line.split('components/')[1].split(')-->')[0],write)
        elif line.strip().startswith('window.jqNoConflict'):
            continue
        elif line.strip().startswith('jqNoConflict(document).ready(function($){'):
            write.write('$(document).ready(function(){')
        else:
            write.write(
                line.replace('></input>','/>')
                    .replace('></img>','/>')
                    .replace('jqNoConflict','$')
                    .replace('./assets/lib/owl.carousel.edited.js','https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js')
                    .replace('./assets/lib/jquery.ui.edited.js','https://code.jquery.com/ui/1.12.1/jquery-ui.min.js')
            )
    write.write('\n')

def writefiles():
    for filename in os.listdir('./'):
        if os.path.isfile('./'+filename):
            if filename.endswith('.html'):
                write = open('./mergeComponents/' + filename, 'w', encoding='utf-8')
                writefile(filename,write)
                write.close()
            else:
                shutil.copyfile('./'+filename,'./mergeComponents/'+filename)

if __name__ == "__main__":
    makedir()
    writefiles()

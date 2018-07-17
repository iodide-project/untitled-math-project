## Summary

Right now this directory is a collection of some tools which i have had a good time writing in rust which can probably also be done in bash, or some other system lang. That said, it's way better to practice something this way.

## specifics

### clipbd
this takes strings and copies them to the clipboard. Needs the clipit manager to be on in order for it to actually work, because the dealloc drops the clipboard contents, and leaves it empty after run otherwise.

### export
This reads a file given as a command line argument and is currently being used in clipbd

### walker 
is a file system walker which is helpful when trying to retrieve certain files. it was created in an attempt to brute force the search for the css work that I was doing for the mental landscapes landing page, but a bit more cleverness in web history searches seems to have worked out better in the end
    
### xournalport
this is a tool I'm trying to pass through the image in lines


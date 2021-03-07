"""
Documentation Installation
=============================

copies the jsx files from the provided directory into the doc
directory and renames them to a .doc extension. With the proper
webpack configuration, these files will be read in as raw text
for the dropdown menu

:Author: Nik Sumikawa
:Date: Dec 2, 2020
"""


import logging
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(lineno)d - %(name)s - %(message)s' )
log = logging.getLogger(__name__)

import os


def traverse_directory( root, path ):
    """ traverses the directory tree and processes all files """

    for dir in os.listdir( '%s/%s' % (root, path) ):

        dir_path = '%s/%s' % (path, dir)

        if os.path.isdir( '%s/%s' % (root, dir_path) ):
            log.debug('recursive dir - %s' % dir )
            traverse_directory( root, dir_path )

        elif 'jsx' in dir  :
            log.debug( 'this is a jsx file : %s' % dir )
            duplicate_file( root, dir_path )

        else:
            log.debug( 'unknown -- %s' % dir )


    # import os
    # if not os.path.exists(path): os.makedirs(path)

def duplicate_file( root, path ):
    """ copy a file from the original to a new location and change
    the file extensions from .jsx to .doc """

    from shutil import copyfile

    dir_path = '/'.join( root.split('/')[:-1] ) + '/doc' + path
    dir_path = '/'.join( dir_path.split('/')[:-1] )

    # create directory tree where the document resides
    if not os.path.exists(dir_path): os.makedirs(dir_path)


    file = '/'.join( path.split('/')[-1:] ).replace('.jsx', '.doc')

    copyfile(
        '%s/%s' % (root, path),
        '%s/%s' % (dir_path, file)
        )



if __name__ == "__main__":


    import argparse
    import pathlib

    parser = argparse.ArgumentParser(description='Documentation - Installation')
    parser.add_argument(
        '--directory',
        required=False,
        help='name of the directory where the .jsx files reside '
        )

    args = parser.parse_args()

    dir = args.directory
    if dir == None: dir = 'examples'

    # pull the location of the file
    file_path = pathlib.Path(__file__).parent.absolute()


    dir_path = '%s/%s' % (file_path, dir)
    traverse_directory( dir_path, '' )

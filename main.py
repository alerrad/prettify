import os, eel
import logging as lg

NAME = 'history.log' # Log file
formatter = lg.Formatter('%(asctime)s:%(levelname)s:%(name)s:%(message)s')

handler = lg.FileHandler(NAME)
handler.setFormatter(formatter)
handler.setLevel(lg.ERROR)

logger = lg.getLogger(__name__)
logger.setLevel(lg.INFO)
logger.addHandler(handler)

@eel.expose
def check_folder_path(path: str) -> bool:
    '''Checks path, returns True if exists and can move in it.
    returns False otherwise.'''

    if path == '': path = os.getcwd()
    
    try: os.chdir(path)
    except Exception as err:
        logger.error('Folder not found')
        return False
    
    return True

@eel.expose
def rename_files(sub_name: str, to_skip: list, prefix = '') -> dict:
    '''Renames files, action can not be undone!
    Then returns a dictionary with stats, eel converts into json'''

    stats = {
        'total': 0,
        'prefixed': 0,
        'skipped': 0
    }

    for doc in os.listdir():
        if doc in to_skip:
            stats['skipped'] += 1
            continue

        if sub_name in doc and doc != 'main.py':
            if doc[:doc.rfind('.')] == sub_name:
                logger.error(f'Empty name case prevented at {doc}')
                stats['skipped'] += 1
                continue
            os.rename(doc, doc.replace(sub_name, ''))
            stats['total'] += 1
    
    if prefix:
        for doc in os.listdir():
            if doc not in to_skip:
                os.rename(doc, prefix + doc)
                stats['prefixed'] += 1

    return stats

def main():
    eel.init('webgui')
    eel.start('index.html')

if __name__ == '__main__':
    main()
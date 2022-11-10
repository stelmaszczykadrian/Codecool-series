def check_pages(page, max_page):
    pages = []
    if max_page > 5:
        for page in range(page-2, page+3):
            if page < 1:
                pages.append(page+5)
            elif page > max_page:
                pages.append(page-5)
            else:
                pages.append(page)
    else:
        pages = list(range(1, max_page+1))
    pages.sort()
    return pages

def list_of_three_characters(characters):
    character_list = ''
    for character in characters:
        character_list += (character['name']) + ','

    return (character_list[:-1])
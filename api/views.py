from utils.decorators import as_json

@as_json()
def latest(request):
    """Get the latest douchey comments."""
    data = [
        {'comment': "change me!"}
    ]

    return data

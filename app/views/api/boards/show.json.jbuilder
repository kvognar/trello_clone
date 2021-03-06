# write some jbuilder to return some json about a board
# it should include the board
#  - its lists
#    - the cards for each list

json.(@board, :title)

json.lists @board.lists do |list|
  json.title list.title
  json.id list.id
  json.ord list.ord
  json.cards list.cards, :title, :description, :ord, :id
end